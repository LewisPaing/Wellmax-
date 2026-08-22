import SwiftUI

struct SectionHeading: View {
    let eyebrow: String
    let title: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(eyebrow.uppercased())
                .font(.caption.weight(.bold))
                .tracking(1.5)
                .foregroundStyle(.wellMaxPurple)
            Text(title)
                .font(.largeTitle.bold())
                .tracking(-1)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

struct RemoteProjectImage: View {
    let url: URL?

    var body: some View {
        AsyncImage(url: url) { phase in
            switch phase {
            case .success(let image):
                image.resizable().scaledToFill()
            case .failure:
                placeholder
            case .empty:
                ZStack {
                    placeholder
                    ProgressView().tint(.white)
                }
            @unknown default:
                placeholder
            }
        }
        .frame(height: 220)
        .clipped()
        .background(Color.wellMaxDeepPurple)
    }

    private var placeholder: some View {
        ZStack {
            LinearGradient(
                colors: [.wellMaxDeepPurple, .wellMaxPurple],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            Image(systemName: "sparkles")
                .font(.system(size: 42, weight: .semibold))
                .foregroundStyle(.white.opacity(0.9))
        }
    }
}

