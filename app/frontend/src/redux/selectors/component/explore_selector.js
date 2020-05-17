import * as ProfileSelector from '../../selectors/normalized/profiles_selector'

export const discoveredProfiles = () => {
    return (state) => {
        const profiles = []
        state.component.explore.profiles.forEach(id => {
            const profile = ProfileSelector.getProfile(id)(state)
            profiles.push(profile)
        });
        return profiles
    }
}