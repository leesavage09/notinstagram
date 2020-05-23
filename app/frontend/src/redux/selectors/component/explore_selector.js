import * as ProfileSelector from '../../selectors/normalized/profiles_selector'

export const discoveredProfiles = () => {
    return (state) => {
        const users = []
        state.component.explore.users.forEach(id => {
            const profile = ProfileSelector.getProfile(id)(state)
            users.push(profile)
        });
        return users
    }
}