# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_04_202047) do
  create_table "likes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "photo_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["photo_id"], name: "index_likes_on_photo_id"
    t.index ["user_id", "photo_id"], name: "index_likes_on_user_id_and_photo_id", unique: true
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "photographers", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["url"], name: "index_photographers_on_url", unique: true
  end

  create_table "photos", force: :cascade do |t|
    t.integer "width", null: false
    t.integer "height", null: false
    t.string "url", null: false
    t.string "avg_color", null: false
    t.string "src_original", null: false
    t.string "src_large2x"
    t.string "src_large"
    t.string "src_medium"
    t.string "src_small"
    t.string "src_portrait"
    t.string "src_landscape"
    t.string "src_tiny"
    t.text "alt"
    t.integer "photographer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "likes_count", default: 0
    t.index ["photographer_id"], name: "index_photos_on_photographer_id"
    t.index ["url"], name: "index_photos_on_url", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "likes", "photos"
  add_foreign_key "likes", "users"
  add_foreign_key "photos", "photographers"
end
