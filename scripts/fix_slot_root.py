
import os

def fix_slot_root(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Simple string replacement as Slot.Root is very specific
    if "Slot.Root" in content:
        print(f"Fixing Slot.Root in {file_path}")
        new_content = content.replace("Slot.Root", "Slot")
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
                fix_slot_root(os.path.join(root, file))

if __name__ == "__main__":
    main()
