import SwiftUI

extension Color {
    static let wellMaxPurple = Color(red: 0.48, green: 0.25, blue: 0.89)
    static let wellMaxDeepPurple = Color(red: 0.10, green: 0.05, blue: 0.16)
    static let wellMaxLavender = Color(red: 0.79, green: 0.66, blue: 1.00)
    static let wellMaxPaper = Color(red: 0.97, green: 0.95, blue: 0.98)
}

struct WellMaxCardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(18)
            .background(Color(.secondarySystemBackground), in: RoundedRectangle(cornerRadius: 22))
    }
}

extension View {
    func wellMaxCard() -> some View {
        modifier(WellMaxCardModifier())
    }
}

