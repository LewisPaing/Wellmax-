# WellMax iOS

Native SwiftUI MVP for WellMax Advertising & Media.

## Included

- Branded native home screen
- Services directory
- Portfolio cards backed by `wellmaxagency.com`
- Native project enquiry form
- Secure HTTPS client portal view
- Accessibility-friendly system navigation and controls
- Privacy manifest
- Unit-test target

## Open on a Mac

1. Install Xcode 26 or newer.
2. Open `WellMax.xcodeproj` (the generated project is already included).
3. If you change `project.yml`, install XcodeGen with `brew install xcodegen` and run `xcodegen generate`.
4. In Xcode, allow automatic package and project updates if prompted.
5. Select the WellMax target, open Signing & Capabilities, and choose the WellMax Apple Developer team.
6. Add the final 1024 × 1024 icon to `WellMax/Assets.xcassets/AppIcon.appiconset`.
7. Run on an iPhone simulator or connected iPhone.

The Xcode project automatically restores the supplied WellMax profile artwork from its encoded source files when needed. This keeps the exact approved icon portable through text-only repository integrations.

## Publishing checklist

- Confirm the organization bundle identifier: `com.wellmaxagency.app`
- Add the production app icon
- Test the client portal with a real client account
- Use `https://wellmaxagency.com/app-privacy.html` as the App Store privacy-policy URL
- Create the App Store Connect record and screenshots
- Upload through Xcode Organizer
- Test using TestFlight before submitting for review
