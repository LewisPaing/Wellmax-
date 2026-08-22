import XCTest
@testable import WellMax

final class AppContentTests: XCTestCase {
    func testMVPContentIsPresent() {
        XCTAssertGreaterThanOrEqual(AppContent.services.count, 5)
        XCTAssertFalse(AppContent.projects.isEmpty)
    }

    func testEveryServiceHasContent() {
        XCTAssertTrue(AppContent.services.allSatisfy { !$0.title.isEmpty && !$0.summary.isEmpty })
    }
}

