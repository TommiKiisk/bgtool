import { Pressable, Text } from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void;
}




export function MedievalButton({ label, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="
        bg-moss dark:bg-moss
        py-10 px-5
        mb-5
        rounded-3xl
        border-2 border-ink
        active:opacity-70
      "
    >
      <Text className="
        text-gold dark:text-gold
        font-medieval
        text-3xl
        text-bold
        text-center
        
      ">
        {label}
      </Text>
    </Pressable>
  );
}
