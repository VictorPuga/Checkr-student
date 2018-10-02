import { StyleSheet, Platform } from 'react-native';

// Colors 0-8 from Apple's iOS Human Interface Guidelines
const colors = {
    red: '#FF3B30',         // 0
    orange: '#FF9500',      // 1
    yellow: '#FFCC00',      // 2
    green: '#4CD964',       // 3
    tealBlue: '#5AC8FA',    // 4
    blue: '#007AFF',        // 5
    purple: '#5856D6',      // 6
    pink: '#FF2D55',        // 7
    gray: '#C1C1C1',        // 8
    main: '#FFA500',
    mainDarker: '#FF8E00',
}

// Colors from Apple's iOS Developer color palette
const ios = {
    header: '#9A9A9A'
}

// Global styles
const globalStyles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fullFlex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        color: colors.main
    },
    titleBlack: {
        fontSize: 50,
        color: colors.main
    },
    subtitle: {
        fontSize: 25,
        color: colors.main,
        fontWeight: '600',
    },
    subtitleBlack: {
        fontSize: 25,
        fontWeight: '600',
    },
    empty: {
        fontSize: 50,
        fontWeight: 'bold',
        margin: 20
    },
    text: {
        fontSize: 40,
    },
    input: {
        ...Platform.select({
            ios: {
                height: 30,
                padding: 5,
                borderStyle: "solid",
                borderWidth: 1,
                borderRadius: 5,
                borderColor: ios.header
            },
            android: {
                height: 60,
            }
        })
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#F0F0F1",
    }
});

export { globalStyles, colors }