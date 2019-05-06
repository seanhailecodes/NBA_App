class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :name
      t.string :photo
      t.string :position
      t.string :height
      t.string :team
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
