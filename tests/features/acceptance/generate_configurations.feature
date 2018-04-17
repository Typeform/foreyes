Feature: Configuration

    Scenario: Generating configuration
        Given some basic data
        When I run the setup script
        Then the suite should be ready to run