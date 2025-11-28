import { ActivityIndicator, Pressable, Text, View } from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
}




export function MedievalButton({ label, onPress, disabled, loading }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className="
        bg-moss
        py-10 px-5
        mb-5
        rounded-3xl
        border-2 border-ink
        active:opacity-70
        ${disabled || loading ? 'opacity-50' : 'active:opacity-70'}
      "
    >
      {loading ? (
        <View className="flex-row justify-center items-center gap-3">
          <ActivityIndicator color="#FFD700" size="small" />
          <Text className="
            text-gold dark:text-gold
            font-medieval
            text-3xl
            font-bold
            text-center
          ">
            {label}
          </Text>
        </View>
      ) : (
        <Text className="
            text-gold dark:text-gold
            font-medieval
            text-3xl
            font-bold
            text-center
          ">
        </Text>
      )}
    </Pressable>
  );
}
