import { Stack } from "expo-router";

export default function AuthLayout() {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="splashScreen"/>
            <Stack.Screen name="register" />
            <Stack.Screen name="registerSignup" />
            <Stack.Screen name="login" />
            {/* Add other auth screens here */}
        </Stack>
    );
}