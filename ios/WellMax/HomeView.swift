import SwiftUI

struct HomeView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                hero
                impact
                featuredServices
                callToAction
            }
        }
        .ignoresSafeArea(edges: .top)
        .background(Color.wellMaxPaper)
        .toolbar(.hidden, for: .navigationBar)
    }

    private var hero: some View {
        VStack(alignment: .leading, spacing: 20) {
            Spacer(minLength: 84)

            Text("WELLMAX ADVERTISING & MEDIA")
                .font(.caption.weight(.bold))
                .tracking(1.7)
                .foregroundStyle(.wellMaxLavender)

            Text("We make brands impossible to ignore.")
                .font(.system(size: 48, weight: .heavy, design: .rounded))
                .tracking(-2.2)
                .foregroundStyle(.white)

            Text("Strategy, identity, campaigns, social media, content and websites for ambitious businesses in Myanmar and beyond.")
                .font(.title3)
                .foregroundStyle(.white.opacity(0.76))
                .lineSpacing(4)

            NavigationLink {
                ProjectInquiryView()
            } label: {
                Label("Start a project", systemImage: "arrow.up.right")
                    .font(.headline)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(.wellMaxPurple, in: Capsule())
                    .foregroundStyle(.white)
            }
            .padding(.top, 8)
            Spacer(minLength: 40)
        }
        .padding(.horizontal, 22)
        .background {
            LinearGradient(
                colors: [.wellMaxDeepPurple, Color(red: 0.16, green: 0.07, blue: 0.25)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .overlay(alignment: .topTrailing) {
                Circle()
                    .fill(.wellMaxPurple.opacity(0.34))
                    .frame(width: 260, height: 260)
                    .blur(radius: 30)
                    .offset(x: 100, y: -30)
            }
        }
    }

    private var impact: some View {
        HStack(spacing: 10) {
            metric("20+", "Clients")
            metric("50+", "Projects")
            metric("360°", "Creative")
        }
        .padding(18)
    }

    private func metric(_ value: String, _ label: String) -> some View {
        VStack(spacing: 4) {
            Text(value).font(.title2.bold()).foregroundStyle(.wellMaxPurple)
            Text(label).font(.caption).foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .background(.white, in: RoundedRectangle(cornerRadius: 18))
    }

    private var featuredServices: some View {
        VStack(alignment: .leading, spacing: 18) {
            SectionHeading(eyebrow: "What we do", title: "Everything your brand needs")
            ForEach(AppContent.services.prefix(3)) { service in
                HStack(alignment: .top, spacing: 14) {
                    Image(systemName: service.symbol)
                        .font(.title3)
                        .foregroundStyle(.wellMaxPurple)
                        .frame(width: 40, height: 40)
                        .background(.wellMaxPurple.opacity(0.1), in: Circle())
                    VStack(alignment: .leading, spacing: 5) {
                        Text(service.title).font(.headline)
                        Text(service.summary).font(.subheadline).foregroundStyle(.secondary)
                    }
                }
                .wellMaxCard()
            }
        }
        .padding(22)
    }

    private var callToAction: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text("Have a project in mind?")
                .font(.caption.weight(.bold))
                .tracking(1.5)
            Text("Let’s make something fly.")
                .font(.largeTitle.bold())
            NavigationLink("Tell us about it") {
                ProjectInquiryView()
            }
            .buttonStyle(.borderedProminent)
            .tint(.white)
            .foregroundStyle(.wellMaxDeepPurple)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(26)
        .foregroundStyle(.white)
        .background(.wellMaxPurple)
    }
}

