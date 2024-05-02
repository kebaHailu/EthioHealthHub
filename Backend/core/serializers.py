from djoser.serializers import UserSerializer, UserCreateSerializer
class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'user_role']


class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ['id', 'username', 'first_name', 'last_name', 'user_role']

