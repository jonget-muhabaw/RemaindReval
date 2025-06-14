 Expat Document Tracker

The Expat Document Tracker is a simple and scalable web application designed to help manage expat employee records and ensure compliance by notifying the liaison officer about expiring documents such as passports, work permits, and resident IDs.

🚀 Features

1. Admin Panel:
   - Add, edit, and delete expat employee records.
   - Upload and view document scans securely.

2. **Document Tracking**:
   - Automatically calculates the number of days left before expiration.
   - Highlights documents expiring within 30 days with a ⚠️ warning.

3. Email Notifications:
   - Sends email alerts 30 days before a document's expiry.
   - Daily or weekly summary emails of upcoming expirations using SendGrid or Nodemailer.

4. Role-Based Login:
   - Secure login for the liaison officer via Firebase Authentication.
   - Role-based access:
     - Liaison officer: Full access (view/edit).
     - Other users: View-only access.

5. Export to Excel:
   - Download all expat records with expiry dates and statuses in `.xlsx` format.


 🏗️ Tech Stack

- Frontend: React.js (responsive UI with Tailwind CSS)
- Backend/Services: Firebase (Auth, Firestore, Storage, Cloud Functions) ahd Express js
- Email Service: Firebase Cloud Functions with Nodemailer (or SendGrid)
- File Handling: Firebase Storage for secure document uploads
- Export to Excel: xlsx JS library for generating `.xlsx` files

 📦 Modules

 1. 🔐 Authentication
- Email/password login for liaison officer.
- Role-based access control.

 2. 📄 Record Management
- Add, edit, and delete expat records.
- Upload/view document scans:
  - Passport
  - Work Permit
  - Resident ID

 3. 📤 Excel Export
 - Export expat records with names, expiry dates, and statuses to an `.xlsx` file.

 4. 📧 Notifications
- Daily expiry checks.
- Auto email alerts 30 days before document expiration.
 5. 📱 UI Design
- Mobile-first, clean, and responsive layout.


 2. Clone the Repository

git clone https://github.com/jonget-muhabaw/RemaindReval.git
cd raval-remainder
