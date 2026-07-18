# DONROOM Authentication Flow

## Identity and authorization model

Firebase Authentication establishes the signed-in identity. The Firestore document at `users/{uid}` is the authoritative application profile and role source. Route access is never granted from local state, form input, URL parameters, or Firebase display-name metadata.

Supported roles are:

- `admin`
- `property`
- `guest`

Supported account statuses are:

- `active`
- `disabled`

Website registration always creates an `active` guest. A user cannot assign or change their own role or status. An administrator promotes a guest by updating the user's Firestore role to `property`. The first administrator is configured manually in Firestore after the corresponding Firebase Authentication account exists.

## Registration

1. The visitor submits full name, email, phone, password, password confirmation, and terms acceptance.
2. Zod validates all input before a Firebase request is made.
3. Firebase Authentication creates the email/password identity.
4. The Authentication profile receives the display name.
5. Firestore creates `users/{uid}` with the required user schema, `role: guest`, and `status: active`.
6. Firebase sends an email-verification message.
7. The user is sent to the email verification page.
8. If Firestore profile creation fails, the newly-created Authentication identity is deleted to avoid an incomplete account.

## Login and session persistence

1. The visitor chooses whether to remember the session.
2. Remembered sessions use Firebase local persistence.
3. Non-remembered sessions use Firebase session persistence.
4. Firebase Authentication validates the credentials.
5. DONROOM reads `users/{uid}` from Firestore.
6. Login is rejected if the profile is missing or its status is not `active`.
7. The user is routed according to the Firestore role.

Firebase's auth-state observer restores valid sessions automatically when the application starts.

## Route protection

- `PublicRoute` prevents authenticated users from opening login and registration pages.
- `ProtectedRoute` requires an authenticated identity, a Firestore profile, and active status.
- `GuestRoute` requires the `guest` Firestore role.
- `PropertyRoute` requires the `property` Firestore role.
- `AdminRoute` requires the `admin` Firestore role.
- A signed-out visitor is redirected to `/login` with the requested location preserved.
- An authenticated user with the wrong role is redirected to `/unauthorized`.

## Password recovery

1. The visitor enters an email address on `/forgot-password`.
2. Firebase sends a password-reset action email.
3. Firebase returns the visitor to `/reset-password` with an action code.
4. DONROOM verifies the action code before showing the reset form.
5. Zod validates the new password and confirmation.
6. Firebase commits the new password and invalidates the action code.

The UI uses a neutral success message for reset requests to reduce account-enumeration risk.

## Email verification

A registered user can resend a verification email from `/verify-email`. Firebase action codes are applied on the same page. The Firebase user is reloaded after successful verification so the application receives the current verification status.

## Profile management

Authenticated users can update their full name, phone number, and profile image. Profile images are validated as JPG, PNG, or WebP and limited to 5 MB. Files are stored under `profile-images/{uid}/`. The download URL is written to both the Firebase Authentication profile and Firestore profile.

Users cannot change their own email, role, status, UID, or creation timestamp through the client application or security rules.

## Administrator configuration

To configure an administrator:

1. Create or register the Firebase Authentication user.
2. Confirm that `users/{uid}` exists.
3. In the Firebase Console, change that document's `role` field from `guest` to `admin`.
4. Keep `status` set to `active`.
5. Sign out and sign back in, or refresh the user session.

Do not allow public clients to write administrator roles. For larger deployments, role changes should be moved to a trusted server or Firebase Admin SDK workflow.

## Firebase Console requirements

Enable Email/Password under Authentication providers. Add production domains to Authentication authorized domains. Configure the password reset and email verification templates and action URLs. Deploy `firestore.rules` and `storage.rules` before production use.
