import { StackActions, NavigationActions } from 'react-navigation'
export const resetToMainAction = StackActions.reset({
    index: 0,
    key: null,
    actions: [
        NavigationActions.navigate({routeName: 'app'})
    ]
})