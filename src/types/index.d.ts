
type ClassProps = {
  classId: string
  className: string
  section: string
  category: "Montessori" | "Primary" | "Middle" | "SSC-I" | "SSC-II"
  fee: number
}

type StudentProps = {
  studentId: string
  registrationNumber: string
  studentMobile: string
  fatherMobile: string
  admissionNumber: string
  studentName: string
  gender: "MALE" | "FEMALE" | "CUSTOM"
  dateOfBirth: string
  fatherName: string
  studentCNIC: string
  fatherCNIC: string
  fatherProfession?: string
  bloodGroup?: string | null
  guardianName?: string | null
  caste?: string
  currentAddress: string
  permanentAddress: string
  medicalProblem?: string | null
  isAssign: boolean
  discount: number
  discountbypercent: number
}

type EmployeeProps = {
  employeeId: string
  employeeName: string
  fatherName: string
  gender: "MALE" | "FEMALE" | "CUSTOM"
  dob: string
  cnic: string
  maritalStatus: 'Married' | 'Unmarried' | 'Widow' | 'Divorced'
  doj: string
  designation: 'Principal' | 'Admin' | 'Head' | 'Clerk' | 'Teacher' | 'Worker'
  residentialAddress: string
  mobileNo: string
  additionalContact?: string | null
  education: string
  salaryAssignments?: SalaryAssignmentProps[]
  salaryIncrements?: SalaryIncrementProps[]
}

type SessionProps = {
  sessionId: string
  sessionName: string
  sessionFrom: string
  sessionTo: string
  salaryAssignments?: SalaryAssignmentProps[]
}

type FeeProps = {
  feeId: string
  feeName: string
  feeTuition: number
  feePaper: number
  feeSport: number
  feeIdcard: number
  feeComm: number
  createdAt: Date
  updatedAt: Date
}

type ClassStudentProps = {
  scId: string
  classId: string
  student: StudentProps
  class: ClassProps
  session: SessionProps
}

type ClassFeeProps = {
  scId: string
  feeId: string
  classId: string
  sessionId: string
  class: ClassProps
  fee: FeeProps
  session: SessionProps
}

type SalaryAssignmentProps = {
  id: string
  employeeId: string
  employee: EmployeeProps
  baseSalary: number
  increment: number
  totalSalary: number
  assignedDate: Date
  sessionId: string
  session: SessionProps
}

type SalaryIncrementProps = {
  id: string
  employeeId: string
  employee: EmployeeProps
  incrementAmount: number
  reason: string
  effectiveDate: Date
}