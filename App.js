import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./contexts/AuthContext";
import { AttendanceProvider } from "./contexts/AttendanceContext";

import { AlertNotificationRoot } from "react-native-alert-notification";
import RootNavigator from "./routes/rootNavigator";


export default function App() {
  
  return (
    <AuthProvider>
      <AttendanceProvider>
        <SafeAreaProvider>
          <AlertNotificationRoot>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AlertNotificationRoot>
        </SafeAreaProvider>
      </AttendanceProvider>
    </AuthProvider>
  );
}


