You are a senior frontend + full-stack engineer.

TASK:
Fix and improve the subscription visibility and upgrade flow in the EXISTING website.

IMPORTANT CONSTRAINTS (NON-NEGOTIABLE):
- Do NOT delete any existing files
- Do NOT refactor unrelated logic
- Do NOT break authentication, AI generation, or payments
- ONLY add or extend code where necessary
- Existing subscription logic must remain intact

----------------------------------------
PROBLEM TO FIX
----------------------------------------

- The current subscription status is NOT visible to users
- Users cannot clearly see whether they are on FREE or PRO
- There is no clear upgrade entry point on the homepage

----------------------------------------
REQUIRED CHANGES
----------------------------------------

1) HOMEPAGE SUBSCRIPTION STATUS (MANDATORY)

Add a subscription status section to the HOMEPAGE only.

This section must:
- Be clearly visible but not intrusive
- Show current plan:
  - "Free Plan – 2 creations/day"
  - OR "Pro Plan – 10 creations/day"
- Optionally show remaining creations for today
- Update automatically based on user data

UI REQUIREMENTS:
- Modern, clean, professional UI
- Rounded card or glass-style container
- Clear typography
- Use badges or subtle highlights for PRO users

----------------------------------------
2) UPGRADE BUTTON (MANDATORY)

If user is on FREE plan:
- Show a prominent “Upgrade to Pro” button

Button behavior:
- On click → redirect user to the PayPal payment / pricing page
- Button should look premium and inviting
- Use hover / subtle animation (non-distracting)

If user is already PRO:
- Replace button with:
  - “Manage Subscription”
  - Or “Pro Active” (non-clickable badge)

----------------------------------------
3) PAYMENT REDIRECTION

- Clicking “Upgrade to Pro” must:
  - Redirect to the existing PayPal subscription flow
  - OR pricing page that leads to PayPal
- Do NOT re-implement PayPal logic
- Only connect the button to the existing payment route

----------------------------------------
4) UI/UX REQUIREMENTS

- The subscription card should:
  - Match the existing site theme
  - Work on desktop and mobile
  - Not block main content
- Use friendly, human copy (not salesy)

Example copy:
“You’re currently on the Free plan. Upgrade to Pro to unlock more daily creations.”

----------------------------------------
5) TECHNICAL REQUIREMENTS

- Subscription status must be fetched from backend / user state
- Do NOT hardcode plan status
- Handle loading and error states gracefully
- Do NOT show upgrade button to logged-out users

----------------------------------------
EXPECTED RESULT
----------------------------------------

After implementation:
- Users can immediately see their current plan on the homepage
- Free users see a clear, attractive upgrade option
- Clicking upgrade reliably redirects to PayPal flow
- Pro users see their active status clearly
- No existing functionality is broken

Proceed carefully.
This is a UI + wiring fix, not a system rewrite.
