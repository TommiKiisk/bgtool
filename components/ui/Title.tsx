import { ReactNode } from "react";
import { Text } from "react-native";

interface TitleProps {
  children: ReactNode;
}

export function Title({ children }: TitleProps) {
  return (
    <Text
      className="
        text-5xl
        font-medieval
        text-ink dark:text-parchment
        
        text-center
        p-6
      "
    >
      {children}
    </Text>
  );
}
