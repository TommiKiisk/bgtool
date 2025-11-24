import { ReactNode } from "react";
import { View } from "react-native";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <View className="
      flex-1
      bg-background-light dark:bg-background-dark 
      p-6">
      {children}
    </View>
  );
}