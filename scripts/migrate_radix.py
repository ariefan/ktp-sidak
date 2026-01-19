
import os
import re

MAPPING = {
    "Accordion": "accordion",
    "AlertDialog": "alert-dialog",
    "AspectRatio": "aspect-ratio",
    "Avatar": "avatar",
    "Checkbox": "checkbox",
    "Collapsible": "collapsible",
    "ContextMenu": "context-menu",
    "Dialog": "dialog",
    "DropdownMenu": "dropdown-menu",
    "HoverCard": "hover-card",
    "Label": "label",
    "Menubar": "menubar",
    "NavigationMenu": "navigation-menu",
    "Popover": "popover",
    "Progress": "progress",
    "RadioGroup": "radio-group",
    "ScrollArea": "scroll-area",
    "Select": "select",
    "Separator": "separator",
    "Slider": "slider",
    "Slot": "slot",
    "Switch": "switch",
    "Tabs": "tabs",
    "Toggle": "toggle",
    "ToggleGroup": "toggle-group",
    "Tooltip": "tooltip",
}

DEPENDENCIES = set()

def camel_to_kebab(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1-\2', s1).lower()

def fix_imports(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content
    
    # Pattern: import { Original as Alias } from "radix-ui"
    # Matches: import { Dialog as SheetPrimitive } from "radix-ui"
    def replace_as(match):
        original = match.group(1).strip()
        alias = match.group(2).strip()
        
        pkg_name = MAPPING.get(original)
        if not pkg_name:
            # Fallback camel to kebab
            pkg_name = camel_to_kebab(original)
        
        DEPENDENCIES.add(f"@radix-ui/react-{pkg_name}")
        return f'import * as {alias} from "@radix-ui/react-{pkg_name}"'

    new_content = re.sub(r'import\s+\{\s*(\w+)\s+as\s+(\w+)\s*\}\s+from\s+"radix-ui"', replace_as, new_content)

    # Pattern: import { Component } from "radix-ui"
    # (Usually only Slot matches this in shadcn)
    def replace_slot(match):
        original = match.group(1).strip()
        if original == "Slot":
            DEPENDENCIES.add("@radix-ui/react-slot")
            return 'import { Slot } from "@radix-ui/react-slot"'
        # If other named imports existed, we might need * as structure or named import
        # But for now assume Slot is the only one used directly like this
        # Actually, maybe "import { Separator } from 'radix-ui'"?
        # If so, standard shadcn uses * as SeparatorPrimitive usually.
        # But if code uses named import directly, we should check if @radix-ui/react-X exports it named.
        # Slot exports { Slot }.
        # Others like Checkbox export { Root, Indicator }.
        # If code imports { Checkbox } from "radix-ui", it implies Checkbox is the Root?
        # That would be incorrect usage for standard packages.
        # I'll log warning if not Slot.
        return match.group(0)

    new_content = re.sub(r'import\s+\{\s*(Slot)\s*\}\s+from\s+"radix-ui"', replace_slot, new_content)
    
    if content != new_content:
        print(f"Fixing {file_path}")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)

def main():
    target_dir = os.path.join(os.getcwd(), "components", "ui")
    if not os.path.exists(target_dir):
        print("Directory not found")
        return

    for root, _, files in os.walk(target_dir):
        for file in files:
            if file.endswith(".tsx") or file.endswith(".ts"):
                fix_imports(os.path.join(root, file))

    print("\nRun the following command to install dependencies:")
    print("pnpm add " + " ".join(sorted(DEPENDENCIES)))

if __name__ == "__main__":
    main()
