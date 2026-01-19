"use client";

// ============================================================================
// MOCK DATA - SIDAK DISPENDUKCAPIL KTP SERVICES
// ============================================================================

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "staff" | "viewer";
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  type: "kelurahan" | "kecamatan" | "kota" | "provinsi" | "pusat";
  code: string;
  parentId: string | null;
}

export type JenisPermohonan = "baru" | "hilang" | "rusak" | "perubahan";
export type ApplicationStatus = "draft" | "pending" | "verified" | "approved" | "printed" | "rejected";
export type SyncStatus = "pending" | "synced" | "error";

export interface KTPApplication {
  id: string;
  applicationNumber: string;
  teamId: string;
  // Data Pemohon
  namaLengkap: string;
  nik: string;
  noKK: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: "L" | "P";
  golonganDarah: "A" | "B" | "AB" | "O" | "-";
  agama: string;
  statusPerkawinan: string;
  pekerjaan: string;
  kewarganegaraan: string;
  // Alamat
  alamat: string;
  rt: string;
  rw: string;
  kelurahan: string;
  kecamatan: string;
  kabupatenKota: string;
  provinsi: string;
  kodePos: string;
  // Kontak
  nomorHP: string;
  email: string;
  // Permohonan
  jenisPermohonan: JenisPermohonan;
  alasanPerubahan?: string;
  // Files
  fotoKK?: string;
  fotoKTPLama?: string;
  suratKehilangan?: string;
  fotoSelfie?: string;
  // Status
  status: ApplicationStatus;
  rejectionReason?: string;
  // Sync
  syncStatus: SyncStatus;
  syncError?: string;
  pusatId?: string;
  // Timestamps
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  printedAt?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  teamId: string;
  action: string;
  tableName: string;
  recordId: string;
  description: string;
  createdAt: string;
}

// ============================================================================
// MOCK DATA VALUES
// ============================================================================

export const mockUsers: User[] = [
  { id: "1", name: "Budi Hartono", email: "budi@kel-sukamaju.go.id", role: "admin", avatar: "" },
  { id: "2", name: "Siti Rahayu", email: "siti@kel-sukamaju.go.id", role: "staff", avatar: "" },
  { id: "3", name: "Ahmad Fauzi", email: "ahmad@kec-cilandak.go.id", role: "admin", avatar: "" },
  { id: "4", name: "Dewi Lestari", email: "dewi@pusat.go.id", role: "super_admin", avatar: "" },
];

export const mockTeams: Team[] = [
  { id: "1", name: "Kelurahan Sukamaju", type: "kelurahan", code: "KEL-001", parentId: "2" },
  { id: "2", name: "Kecamatan Cilandak", type: "kecamatan", code: "KEC-001", parentId: "3" },
  { id: "3", name: "Kota Jakarta Selatan", type: "kota", code: "KOTA-001", parentId: "4" },
  { id: "4", name: "Provinsi DKI Jakarta", type: "provinsi", code: "PROV-001", parentId: "5" },
  { id: "5", name: "PUSAT", type: "pusat", code: "PUSAT", parentId: null },
  { id: "6", name: "Kelurahan Cipete", type: "kelurahan", code: "KEL-002", parentId: "2" },
  { id: "7", name: "Kecamatan Kebayoran", type: "kecamatan", code: "KEC-002", parentId: "3" },
];

export const mockApplications: KTPApplication[] = [
  {
    id: "1",
    applicationNumber: "KTP-2024-0001",
    teamId: "1",
    namaLengkap: "ANDI PRASETYO",
    nik: "3174052001850001",
    noKK: "3174050101120001",
    tempatLahir: "JAKARTA",
    tanggalLahir: "1985-01-20",
    jenisKelamin: "L",
    golonganDarah: "O",
    agama: "ISLAM",
    statusPerkawinan: "KAWIN",
    pekerjaan: "KARYAWAN SWASTA",
    kewarganegaraan: "WNI",
    alamat: "JL. MAWAR NO. 123",
    rt: "005",
    rw: "003",
    kelurahan: "SUKAMAJU",
    kecamatan: "CILANDAK",
    kabupatenKota: "JAKARTA SELATAN",
    provinsi: "DKI JAKARTA",
    kodePos: "12560",
    nomorHP: "081234567890",
    email: "andi.prasetyo@email.com",
    jenisPermohonan: "baru",
    status: "pending",
    syncStatus: "pending",
    createdBy: "2",
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-01-15T08:30:00Z",
  },
  {
    id: "2",
    applicationNumber: "KTP-2024-0002",
    teamId: "1",
    namaLengkap: "SARI WULANDARI",
    nik: "3174056506900002",
    noKK: "3174050101120002",
    tempatLahir: "BANDUNG",
    tanggalLahir: "1990-06-25",
    jenisKelamin: "P",
    golonganDarah: "A",
    agama: "ISLAM",
    statusPerkawinan: "BELUM KAWIN",
    pekerjaan: "PNS",
    kewarganegaraan: "WNI",
    alamat: "JL. MELATI NO. 45",
    rt: "002",
    rw: "001",
    kelurahan: "SUKAMAJU",
    kecamatan: "CILANDAK",
    kabupatenKota: "JAKARTA SELATAN",
    provinsi: "DKI JAKARTA",
    kodePos: "12560",
    nomorHP: "082345678901",
    email: "sari.wulandari@email.com",
    jenisPermohonan: "hilang",
    status: "verified",
    syncStatus: "pending",
    createdBy: "2",
    createdAt: "2024-01-14T10:15:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
    verifiedBy: "1",
    verifiedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "3",
    applicationNumber: "KTP-2024-0003",
    teamId: "1",
    namaLengkap: "RUDI HERMAWAN",
    nik: "3174051203880003",
    noKK: "3174050101120003",
    tempatLahir: "SURABAYA",
    tanggalLahir: "1988-03-12",
    jenisKelamin: "L",
    golonganDarah: "B",
    agama: "KRISTEN",
    statusPerkawinan: "KAWIN",
    pekerjaan: "WIRASWASTA",
    kewarganegaraan: "WNI",
    alamat: "JL. ANGGREK NO. 78",
    rt: "008",
    rw: "004",
    kelurahan: "SUKAMAJU",
    kecamatan: "CILANDAK",
    kabupatenKota: "JAKARTA SELATAN",
    provinsi: "DKI JAKARTA",
    kodePos: "12560",
    nomorHP: "083456789012",
    email: "rudi.hermawan@email.com",
    jenisPermohonan: "rusak",
    status: "approved",
    syncStatus: "synced",
    pusatId: "PUSAT-2024-00123",
    createdBy: "2",
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-14T11:30:00Z",
    verifiedBy: "1",
    verifiedAt: "2024-01-12T09:00:00Z",
    approvedBy: "1",
    approvedAt: "2024-01-14T11:30:00Z",
  },
  {
    id: "4",
    applicationNumber: "KTP-2024-0004",
    teamId: "1",
    namaLengkap: "MAYA ANGGRAINI",
    nik: "3174054508950004",
    noKK: "3174050101120004",
    tempatLahir: "YOGYAKARTA",
    tanggalLahir: "1995-08-15",
    jenisKelamin: "P",
    golonganDarah: "AB",
    agama: "KATOLIK",
    statusPerkawinan: "BELUM KAWIN",
    pekerjaan: "MAHASISWA",
    kewarganegaraan: "WNI",
    alamat: "JL. DAHLIA NO. 12",
    rt: "003",
    rw: "002",
    kelurahan: "SUKAMAJU",
    kecamatan: "CILANDAK",
    kabupatenKota: "JAKARTA SELATAN",
    provinsi: "DKI JAKARTA",
    kodePos: "12560",
    nomorHP: "084567890123",
    email: "maya.anggraini@email.com",
    jenisPermohonan: "baru",
    status: "printed",
    syncStatus: "synced",
    pusatId: "PUSAT-2024-00098",
    createdBy: "2",
    createdAt: "2024-01-05T09:45:00Z",
    updatedAt: "2024-01-13T15:00:00Z",
    verifiedBy: "1",
    verifiedAt: "2024-01-07T10:00:00Z",
    approvedBy: "1",
    approvedAt: "2024-01-10T14:00:00Z",
    printedAt: "2024-01-13T15:00:00Z",
  },
  {
    id: "5",
    applicationNumber: "KTP-2024-0005",
    teamId: "1",
    namaLengkap: "BAMBANG SUTRISNO",
    nik: "3174052807750005",
    noKK: "3174050101120005",
    tempatLahir: "SEMARANG",
    tanggalLahir: "1975-07-28",
    jenisKelamin: "L",
    golonganDarah: "O",
    agama: "ISLAM",
    statusPerkawinan: "KAWIN",
    pekerjaan: "PEDAGANG",
    kewarganegaraan: "WNI",
    alamat: "JL. KENANGA NO. 56",
    rt: "006",
    rw: "005",
    kelurahan: "SUKAMAJU",
    kecamatan: "CILANDAK",
    kabupatenKota: "JAKARTA SELATAN",
    provinsi: "DKI JAKARTA",
    kodePos: "12560",
    nomorHP: "085678901234",
    email: "bambang.sutrisno@email.com",
    jenisPermohonan: "perubahan",
    alasanPerubahan: "Perubahan alamat tempat tinggal",
    status: "rejected",
    rejectionReason: "Dokumen KK tidak sesuai dengan data yang diinput",
    syncStatus: "pending",
    createdBy: "2",
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-17T08:30:00Z",
    verifiedBy: "1",
    verifiedAt: "2024-01-17T08:30:00Z",
  },
  {
    id: "6",
    applicationNumber: "KTP-2024-0006",
    teamId: "6",
    namaLengkap: "LISA PERMATA",
    nik: "3174053001980006",
    noKK: "3174050201120006",
    tempatLahir: "JAKARTA",
    tanggalLahir: "1998-01-30",
    jenisKelamin: "P",
    golonganDarah: "A",
    agama: "BUDDHA",
    statusPerkawinan: "BELUM KAWIN",
    pekerjaan: "KARYAWAN SWASTA",
    kewarganegaraan: "WNI",
    alamat: "JL. TERATAI NO. 89",
    rt: "001",
    rw: "007",
    kelurahan: "CIPETE",
    kecamatan: "CILANDAK",
    kabupatenKota: "JAKARTA SELATAN",
    provinsi: "DKI JAKARTA",
    kodePos: "12550",
    nomorHP: "086789012345",
    email: "lisa.permata@email.com",
    jenisPermohonan: "baru",
    status: "pending",
    syncStatus: "error",
    syncError: "Connection timeout to PUSAT server",
    createdBy: "2",
    createdAt: "2024-01-18T13:30:00Z",
    updatedAt: "2024-01-18T13:30:00Z",
  },
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    userId: "2",
    userName: "Siti Rahayu",
    teamId: "1",
    action: "CREATE",
    tableName: "ktp_applications",
    recordId: "1",
    description: "Membuat permohonan KTP baru untuk ANDI PRASETYO",
    createdAt: "2024-01-15T08:30:00Z",
  },
  {
    id: "2",
    userId: "1",
    userName: "Budi Hartono",
    teamId: "1",
    action: "UPDATE",
    tableName: "ktp_applications",
    recordId: "2",
    description: "Memverifikasi permohonan KTP SARI WULANDARI",
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "3",
    userId: "1",
    userName: "Budi Hartono",
    teamId: "1",
    action: "UPDATE",
    tableName: "ktp_applications",
    recordId: "3",
    description: "Menyetujui permohonan KTP RUDI HERMAWAN",
    createdAt: "2024-01-14T11:30:00Z",
  },
  {
    id: "4",
    userId: "1",
    userName: "Budi Hartono",
    teamId: "1",
    action: "UPDATE",
    tableName: "ktp_applications",
    recordId: "5",
    description: "Menolak permohonan KTP BAMBANG SUTRISNO - Dokumen tidak valid",
    createdAt: "2024-01-17T08:30:00Z",
  },
  {
    id: "5",
    userId: "2",
    userName: "Siti Rahayu",
    teamId: "1",
    action: "CREATE",
    tableName: "ktp_applications",
    recordId: "6",
    description: "Membuat permohonan KTP baru untuk LISA PERMATA",
    createdAt: "2024-01-18T13:30:00Z",
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getApplicationsByTeam(teamId: string): KTPApplication[] {
  return mockApplications.filter((app) => app.teamId === teamId);
}

export function getApplicationById(id: string): KTPApplication | undefined {
  return mockApplications.find((app) => app.id === id);
}

export function getTeamById(id: string): Team | undefined {
  return mockTeams.find((team) => team.id === id);
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
}

export function getStatusColor(status: ApplicationStatus): string {
  const colors: Record<ApplicationStatus, string> = {
    draft: "bg-gray-500",
    pending: "bg-yellow-500",
    verified: "bg-blue-500",
    approved: "bg-green-500",
    printed: "bg-purple-500",
    rejected: "bg-red-500",
  };
  return colors[status];
}

export function getStatusLabel(status: ApplicationStatus): string {
  const labels: Record<ApplicationStatus, string> = {
    draft: "Draft",
    pending: "Menunggu Verifikasi",
    verified: "Terverifikasi",
    approved: "Disetujui",
    printed: "Sudah Dicetak",
    rejected: "Ditolak",
  };
  return labels[status];
}

export function getSyncStatusColor(status: SyncStatus): string {
  const colors: Record<SyncStatus, string> = {
    pending: "bg-yellow-500",
    synced: "bg-green-500",
    error: "bg-red-500",
  };
  return colors[status];
}

export function getSyncStatusLabel(status: SyncStatus): string {
  const labels: Record<SyncStatus, string> = {
    pending: "Menunggu Sinkronisasi",
    synced: "Tersinkronisasi",
    error: "Gagal Sinkronisasi",
  };
  return labels[status];
}

export function getJenisPermohonanLabel(jenis: JenisPermohonan): string {
  const labels: Record<JenisPermohonan, string> = {
    baru: "Permohonan Baru",
    hilang: "KTP Hilang",
    rusak: "KTP Rusak",
    perubahan: "Perubahan Data",
  };
  return labels[jenis];
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Stats helpers
export function getApplicationStats(applications: KTPApplication[]) {
  return {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    verified: applications.filter((a) => a.status === "verified").length,
    approved: applications.filter((a) => a.status === "approved").length,
    printed: applications.filter((a) => a.status === "printed").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    syncPending: applications.filter((a) => a.syncStatus === "pending").length,
    syncError: applications.filter((a) => a.syncStatus === "error").length,
  };
}
