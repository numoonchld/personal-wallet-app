CREATE TABLE personal_wallet(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(10) UNIQUE NOT NULL,
    balance BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT Now()
);

CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    transaction_type BOOLEAN NOT NULL,
    transaction_date TIMESTAMPTZ NOT NULL DEFAULT Now(),
    initial_balance BIGINT NOT NULL,
    amount BIGINT NOT NULL,
    final_balance BIGINT NOT NULL, 
    remarks VARCHAR(140),
    FOREIGN KEY (user_id)
        REFERENCES personal_wallet (user_id)
);