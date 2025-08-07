# Assignment 7 – Data Split and Count (Node.js Simulation of COBOL Batch Processing)

## 🔰 Introduction

This assignment simulates a COBOL batch program in **Node.js**, mimicking a legacy **mainframe system** used in an insurance company. It is part of a larger processing system that handles **insurance claims**.

The objective is to split **valid claim records** into two separate files (`REPAIR` and `REPLACE`) based on the **Claim Type** and generate a detailed **report** showing statistics and totals.

---

## 🗃️ Input File Layout

The program processes the valid data file:  
`DataSet.txt`

Each record has fixed-width fields:

| Field Name       | Position    | COBOL PIC      | Description                      |
|------------------|-------------|----------------|----------------------------------|
| Policy Number    | 1 – 10      | X(10)          | Unique policy number             |
| Customer Name    | 11 – 30     | X(20)          | Name of the policyholder         |
| Product Code     | 31 – 33     | X(3)           | Appliance code                   |
| Claim Type       | 34 – 40     | X(7)           | `REPAIR` or `REPLACE`            |
| Amount           | 41 – 46     | 9(4)V99        | Amount claimed (decimal)         |
| Justification    | 47 – 76     | X(30)          | Reason for the claim             |

---

## 📂 Output Files

- `A7.REPAIR.DAT` – All `REPAIR` records (same layout as input)
- `A7.REPLACE.DAT` – All `REPLACE` records (same layout as input)
- `A7.RPT.OUT` – A summary report with totals and analysis

---

## ⚙️ Processing Rules

1. **Split Records by Claim Type**:
   - If `Claim Type` is `REPAIR` → Write to `A7.REPAIR.DAT`
   - If `Claim Type` is `REPLACE` → Write to `A7.REPLACE.DAT`

2. **Report Generation**:
   - For `REPAIR`:
     - Total number of REPAIR records
     - Total REPAIR amount
     - Record count and amount per **Product Code**
   - For `REPLACE`:
     - Total number of REPLACE records
     - Total REPLACE amount
     - Record count and amount per **Product Code**
     - % and number of claims per **Region**
   - **Grand Total** for all claims (REPAIR + REPLACE)

---

## 📄 Report Requirements

- Include all of the above stats in a clear, formatted summary.
- Your layout design is flexible but must be clean and readable.

---

## 📁 Folder/File Naming Convention

Replace `YYY` with the **last three letters** of your mainframe ID.

| File | Description |
|------|-------------|
| `A7SPLIT` | COBOL or Node.js split logic program |
| `A7CL`    | Compile JCL (used in COBOL env) |
| `A7R`     | Run JCL (used in COBOL env) |
| `A7.REPAIR.DAT` | REPAIR data output |
| `A7.REPLACE.DAT` | REPLACE data output |
| `A7.RPT.OUT` | Final output report file |

---

## 📝 Submission Instructions

Submit a `.zip` containing the following:

- ✅ `A7SPLIT` source code 
- ✅ `A7.REPAIR.DAT` file
- ✅ `A7.REPLACE.DAT` file
- ✅ `A7.RPT.OUT` file

Upload to the **DC Connect** drop box.

---

## ✅ Marking Scheme (Total: 73 Marks)

| Criteria | Marks |
|---------|-------|
| Follows Programming Standards | 25 |
| Valid Data Only | 5 |
| Report Output Matches Spec | 5 |
| REPAIR Record Counts and Totals | 3 |
| REPAIR Totals by Product Code | 7 |
| REPLACE Counts and % by Region | 7 |
| REPLACE Totals by Product Code | 7 |
| REPLACE Total Count and Amount | 2 |
| Grand Total of All Claims | 2 |
| Reconciliation with Edit Program Totals | 5 |
| Proper Submission Files in Zip | 5 |

---

## 📌 Notes

- No error checking is needed (assume input data is already validated).
- You are encouraged to simulate COBOL logic in **Node.js** for batch file processing.

---

## 🧠 Tip for Development

- Use `fs.createReadStream()` and `readline` to process large files line-by-line.
- Use `fs.writeFileSync()` or `fs.createWriteStream()` to split records into files.
- Create a reusable function to calculate totals and format reports.

---

