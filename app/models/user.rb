class User < ApplicationRecord
    has_secure_password
    has_many :posts
    has_many :players

    validates :name, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

    validates :password,
                length: { minimum: 4 },
                if: -> { new_record? || !password.nil?}
end
