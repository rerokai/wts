#!/bin/bash

HR_TOKEN="ТВОЙ_ТОКЕН"   # вставь сюда токен

# --- 1. Создаём команды (отделы) ---
echo "Создаём отделы..."

IT_TEAM=$(curl -s -X POST "http://127.0.0.1:8000/api/teams/" \
  -H "Authorization: Bearer $HR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "IT отдел", "description": "Разработка и поддержка", "manager_id": 2}' | jq -r '.id')

MARKETING_TEAM=$(curl -s -X POST "http://127.0.0.1:8000/api/teams/" \
  -H "Authorization: Bearer $HR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Маркетинг", "description": "Продвижение и реклама", "manager_id": 2}' | jq -r '.id')

ADMIN_TEAM=$(curl -s -X POST "http://127.0.0.1:8000/api/teams/" \
  -H "Authorization: Bearer $HR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Администрация", "description": "Управление и HR", "manager_id": 2}' | jq -r '.id')

echo "Отделы созданы: IT=$IT_TEAM, Маркетинг=$MARKETING_TEAM, Администрация=$ADMIN_TEAM"

# --- 2. Функция создания пользователя + сотрудника ---
create_user_and_employee() {
  local email=$1
  local first_name=$2
  local last_name=$3
  local position=$4
  local team_id=$5

  # Регистрируем пользователя (роль employee)
  resp=$(curl -s -X POST "http://127.0.0.1:8000/api/users/register" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$email\", \"password\": \"password123\"}")
  user_id=$(echo $resp | jq -r '.id')
  if [ "$user_id" == "null" ]; then
    echo "  Ошибка регистрации $email (возможно, уже существует)"
    return
  fi

  # Создаём профиль сотрудника
  curl -s -X POST "http://127.0.0.1:8000/api/employees/" \
    -H "Authorization: Bearer $HR_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"first_name\": \"$first_name\", \"last_name\": \"$last_name\", \"position\": \"$position\", \"team_id\": $team_id, \"user_id\": $user_id}" > /dev/null
  echo "  Создан: $first_name $last_name ($email) -> отдел $team_id"
}

# --- 3. Наполняем IT отдел (10 сотрудников) ---
echo "Наполняем IT отдел..."
for i in {1..10}; do
  create_user_and_employee "it.employee$i@example.com" "ITИмя$i" "ITФамилия$i" "Разработчик" $IT_TEAM
done

# --- 4. Маркетинг (5 сотрудников) ---
echo "Наполняем Маркетинг..."
for i in {1..5}; do
  create_user_and_employee "marketing.employee$i@example.com" "МаркИмя$i" "МаркФамилия$i" "Маркетолог" $MARKETING_TEAM
done

# --- 5. Администрация (4 сотрудника) ---
echo "Наполняем Администрацию..."
for i in {1..4}; do
  create_user_and_employee "admin.employee$i@example.com" "АдминИмя$i" "АдминФамилия$i" "Менеджер" $ADMIN_TEAM
done

echo "Готово! Теперь в системе 3 отдела и 19 сотрудников."