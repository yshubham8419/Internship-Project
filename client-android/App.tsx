import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer} from "@react-navigation/native";
import Login from "./src/Login";
import Register from "./src/Signup";
import React from "react";
import { AppDataProvider } from "./src/AppContext";
import Dashboard from "./src/Dashboard";
import Home from "./src/Home";
import UrlPage from "./src/UrlPage";

const Stack = createNativeStackNavigator();

const App = ()=>{
    return(
        <AppDataProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown:false}}>
                    <Stack.Screen name='UrlPage' component={UrlPage}/>
                    <Stack.Screen name='Home' component={Home}/>
                    <Stack.Screen name="Login" component = {Login}/> 
                    <Stack.Screen name="Register" component= {Register}/>
                    <Stack.Screen name="Dashboard" component={Dashboard}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppDataProvider>
        
    );
}
export default App;
