# School System: deployment checklist

Project: addison-sms. Do these in order. Tick each box before going to the next step.

## A. Before the school goes live

- [ ] Confirm the `apiKey` in index.html matches the Firebase console (Project settings > Your apps > Web).
      Check `O` (letter) against `0` (zero) carefully. If the app shows "invalid API key", that is the first thing to check.
- [ ] Firebase console > Authentication > Sign-in method > Email/Password: switch ON.
- [ ] Firestore Database > Create database > production mode. Choose the nearest region.
- [ ] Firestore > Rules: delete everything, paste firestore.rules, click Publish.
- [ ] Rules Playground: run the tests in section C before real data goes in.
- [ ] Upload index.html, sw.js, manifest.json, the icons and favicon to hosting (GitHub Pages or `firebase deploy`).
      Do NOT upload firestore.rules or README.txt to the public site.
- [ ] Open the live link on a phone over HTTPS. A padlock must show. The app will not work without HTTPS.

## B. Create the people

1. [ ] Open the app and create YOUR account (the platform owner). Note the username.
2. [ ] Firestore > users > your document > change `role` from `pending` to `owner`. Refresh.
       (Only the owner can make another owner. The head cannot.)
3. [ ] Create the head's account. In Setup > Users and roles, give it role `admin`.
4. [ ] Teachers, accountant and parents create their own accounts. Give each a role in Setup.
5. [ ] Setup > Link a parent to children, for each parent.

## C. Rules tests (Firestore > Rules > Rules Playground)

Run each one and check the result. A "denied" result is correct where stated.

- [ ] A head (admin) updating `config` with `subUntil` set: DENIED.
- [ ] An owner updating `config` with `subUntil`: ALLOWED.
- [ ] A head changing a user's role to `owner`: DENIED.
- [ ] A teacher reading students of a class they do not teach: DENIED.
- [ ] A parent reading a student who is not their child: DENIED.
- [ ] A parent reading their own child's invoice: ALLOWED.
- [ ] A head reading `subPayments`: DENIED. An owner reading `subPayments`: ALLOWED.
- [ ] Any role writing to `scores` after the score sheet is locked: DENIED.
- [ ] Any staff member reading data after `subUntil` has passed (not the owner): DENIED.

## D. iPhone test (Safari and the home-screen app)

- [ ] Open the link in Safari. Log in. Note the header shows the school name.
- [ ] Share > Add to Home Screen. Open the new icon. It should open full screen with no browser bar.
- [ ] Type in a username and a score. The text must be readable and the screen must not zoom in.
- [ ] Scores open the number keypad with decimals.
- [ ] Print a report card. A new tab opens; use Share > Print, or Save as PDF.
- [ ] Export a student record or a backup. The Share sheet should open. Save the file to Files.
- [ ] Rotate the phone. Everything must still be usable.

## E. Offline test

- [ ] Log in while online. Open the Attendance page once so it is cached.
- [ ] Turn on Airplane mode. Close the app. Reopen it from the home-screen icon.
      The app should open and show the last data.
- [ ] While offline, mark attendance and save. It should say "Saved on this device, will sync when online".
- [ ] Turn off Airplane mode. The saved attendance must appear in Records within a minute.
- [ ] Known limit: on iPhone Safari (not the home-screen app), browsers may clear offline data after a week
      without use. Always use the home-screen app and keep monthly backups.

## F. Backups

- [ ] Each month, the head downloads Setup > Backup and stores the file off the phone (email to yourself or Drive).
- [ ] Once, test a restore on a spare Firebase project so you know the backup file is usable.

## G. Money and subscriptions

- [ ] Owner > Billing: confirm the plan prices. They are placeholders until you set them.
- [ ] Record the first subscription payment. Confirm the school's status shows Active.
- [ ] Test the lock: set the end date to yesterday. A teacher should see "Subscription ended". The owner should not.
      Then set it back.
- [ ] Mobile money and bank payments are recorded by hand, with the transaction reference.
      Keep the reference: the app warns you if it is used twice.

## H. Before real children's data goes in

- [ ] Tell parents what is collected and why (the consent box on admission records this).
- [ ] Check your duties under Ghana's Data Protection Act, 2012 (Act 843). Confirm with a lawyer.
- [ ] Decide who may see what. Staff accounts should be the minimum needed.
- [ ] Remove test students and test scores (Firestore console, or start a fresh project).

## I. Ongoing

- [ ] Each term: set the term dates in Setup, create invoices, enter scores, compute report cards,
      check them (Check before publishing), then publish.
- [ ] Each update: edit `VERSION` in sw.js (for example school-v3) before uploading, so phones refresh.

## J. Logo, region and district (Setup page)

- [ ] Setup > School logo: upload the school crest. It is shrunk automatically and shows in the header and on report cards.
- [ ] Setup > Region, then District. Check the district list for your region under "Edit the district list" against the official list.
- [ ] Set your school's region and district before publishing report cards.

## K. How the head pays and how the owner confirms

1. Owner > Billing > "How schools pay you": enter your mobile money network and number, account name, and optionally a bank
   account or an online payment link. Save.
2. The head opens Setup > "Subscription and payment", sees the plans and your details, and pays.
3. The head fills in "I have paid" with the amount, method, the transaction reference from the MoMo or bank message, and the date.
4. Owner > Billing > "Payments reported by schools": check the money arrived on your MoMo or bank. Then Confirm
   (the subscription runs on from the current end date) or Reject with a reason.
5. Test this once with a small real amount before the first school pays.

Note: each school is its own Firebase project, so the owner confirms payments in each school's app. A single
dashboard for all schools is a separate build.

## L. Staff joining, parent emails and report-card PDFs (new)

- [ ] Setup > Staff join code: give this code to staff. Staff create their account, choose their role and enter the code.
      Each person then appears under "Waiting for approval". Approve them there (or turn them down).
- [ ] Students: fill in the Parent email for each child. Report cards are sent to this address.
- [ ] Report cards: PDF downloads the report. "Email to parent" opens the phone's share sheet with the PDF attached,
      so choose Gmail and type the parent's address (shown in the message). On a computer, it downloads the PDF
      and opens an email to the parent, to attach manually.
- [ ] Test once on a phone with your own address before sending to parents.
- [ ] Rules: publish the new firestore.rules (it removes the exam rules and adds the join-code check).
