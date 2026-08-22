import Foundation

struct AgencyService: Identifiable, Hashable {
    let id = UUID()
    let title: String
    let summary: String
    let symbol: String
}

struct PortfolioProject: Identifiable, Hashable {
    let id = UUID()
    let title: String
    let category: String
    let summary: String
    let imageURL: URL?
}

enum AppContent {
    static let services: [AgencyService] = [
        .init(title: "Brand Strategy", summary: "Positioning, naming and a clear direction for growth.", symbol: "scope"),
        .init(title: "Brand Identity", summary: "Distinctive identity systems built to stay recognizable.", symbol: "sparkles"),
        .init(title: "Campaigns", summary: "Ideas, art direction and advertising that earn attention.", symbol: "megaphone.fill"),
        .init(title: "Social Media", summary: "Content systems, community and paid social campaigns.", symbol: "rectangle.3.group.fill"),
        .init(title: "Web Design", summary: "Fast, useful digital experiences designed around conversion.", symbol: "macbook.and.iphone"),
        .init(title: "Content", summary: "Copy, photography, video and graphics with one clear voice.", symbol: "camera.fill")
    ]

    static let projects: [PortfolioProject] = [
        .init(
            title: "Hyundai Motor Myanmar",
            category: "Social campaign",
            summary: "Campaign content and creative direction for an automotive audience.",
            imageURL: URL(string: "https://wellmaxagency.com/images/portfolio/hyundai-social.webp")
        ),
        .init(
            title: "Restaurant Campaign",
            category: "Campaign",
            summary: "A social-first visual system designed to drive visits and conversation.",
            imageURL: URL(string: "https://wellmaxagency.com/images/portfolio/restaurant-campaign.webp")
        ),
        .init(
            title: "WellMax Posters",
            category: "Art direction",
            summary: "Editorial poster work combining expressive typography and bold imagery.",
            imageURL: URL(string: "https://wellmaxagency.com/images/work/posters/promo-01.webp")
        )
    ]
}
