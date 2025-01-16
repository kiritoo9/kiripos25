create table if not exists roles (
    id uuid primary key,
    name varchar(30),
    description varchar(30),
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp
);

create table if not exists branches (
    id uuid primary key,
    name varchar(50),
    phone varchar(20),
    address text,
    remark text,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp
);

create table if not exists menus (
    id uuid primary key,
    parent_id uuid default null,
    label varchar(50),
    name varchar(50),
    url varchar(100),
    icon varchar(100),
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp
);

create table if not exists role_menus (
    id uuid primary key,
    role_id uuid,
    menu_id uuid,
    act_view boolean default false,
    act_detail boolean default false,
    act_create boolean default false,
    act_update boolean default false,
    act_delete boolean default false,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp,
    foreign key (role_id) references roles(id) on delete cascade,
    foreign key (menu_id) references menus(id) on delete cascade
);

create table if not exists users (
    id uuid primary key,
    username varchar(50),
    password varchar(100),
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp
);

create table if not exists user_profiles (
    id uuid primary key,
    user_id uuid,
    full_name varchar(255),
    email varchar(100),
    phone varchar(20),
    address text,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp,
    foreign key (user_id) references users(id) on delete cascade
);

create table if not exists user_roles (
    id uuid primary key,
    user_id uuid,
    role_id uuid,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp,
    foreign key (user_id) references users(id) on delete cascade,
    foreign key (role_id) references roles(id) on delete cascade
);

create table if not exists user_branches (
    id uuid primary key,
    user_id uuid,
    branch_id uuid,
    branch_head boolean default false,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp,
    foreign key (user_id) references users(id) on delete cascade,
    foreign key (branch_id) references branches(id) on delete cascade
);

create table if not exists tables (
    id uuid primary key,
    table_no varchar(10),
    max_person integer default 1,
    remark text,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp
);

create table if not exists customers (
    id uuid primary key,
    name varchar(100),
    email varchar(100),
    phone varchar(20),
    address text,
    gender char(1) default 'M',
    range_of_age varchar(50),
    remark text,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp
);

create table if not exists vouchers (
    id uuid primary key,
    name varchar(100),
    description text,
    amount decimal(10, 2) default 0,
    percentage decimal(10, 2) default 0,
    start_date date,
    end_date date,
    is_publish boolean default false,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp
);

create table if not exists voucher_codes (
    id uuid primary key,
    voucher_id uuid,
    code varchar(20),
    remark text,
    foreign key (voucher_id) references vouchers(id) on delete cascade
);

create table if not exists product_categories (
    id uuid primary key,
    name varchar(100),
    description text,
    icon text,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp
);

create table if not exists products (
    id uuid primary key,
    category_id uuid,
    name text,
    capital_price decimal(13, 2),
    sell_price decimal(13, 2),
    description text,
    details jsonb default null,
    images jsonb default null,
    status char(2) default 'S1',
    tags jsonb default null,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp,
    foreign key (category_id) references product_categories(id) on delete cascade
);
comment on column products.status is 'S1=draft,S2=publish,S3=discontinue';

create table if not exists stock_movements (
    id uuid primary key,
    product_id uuid,
    reff_id uuid default null,
    change_qty integer,
    movement_type char(2) default 'M1',
    movement_date date,
    remark text,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp,
    foreign key (product_id) references products(id) on delete cascade
);
comment on column stock_movements.movement_type is 'M1=purchase,M2=sale,M3=return,M4=adjustment';

create table if not exists purchases (
    id uuid primary key,
    user_id uuid,
    purchase_no varchar(20),
    purchase_date date,
    total_qty integer default 0,
    total_price decimal(13, 2) default 0,
    remark text,
    pic_name varchar(100),
    status char(2) default 'S1',
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp,
    foreign key (user_id) references users(id) on delete cascade
);
comment on column purchases.status is 'S1=draft,S2=approved,S3=rejected';

create table if not exists purchase_items (
    id uuid primary key,
    purchase_id uuid,
    product_id uuid,
    qty integer default 0,
    price decimal(13, 2),
    foreign key (purchase_id) references purchases(id) on delete cascade,
    foreign key (product_id) references products(id) on delete cascade
);

create table if not exists orders (
    id uuid primary key,
    user_id uuid,
    table_id uuid default null,
    order_no varchar(20),
    order_date date,
    order_qty integer default 0,
    order_price decimal(13, 2) default 0,
    remark text,
    pic_name varchar(100),
    status char(2) default 'S1',
    discount_amount decimal(13, 2) default 0,
    discount_percentage integer default 0,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp,
    foreign key (user_id) references users(id) on delete cascade
);
comment on column orders.status is 'S1=pending,S2=paid,S3=canceled';

create table if not exists order_items (
    id uuid primary key,
    order_id uuid,
    product_id uuid,
    qty integer default 0,
    price decimal(13, 2) default 0,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp,
    foreign key (order_id) references orders(id) on delete cascade,
    foreign key (product_id) references products(id) on delete cascade
);

create table if not exists order_vouchers (
    id uuid primary key,
    order_id uuid,
    voucher_id uuid,
    voucher_code varchar(20),
    remark text,
    deleted boolean default false,
    created_at timestamp,
    updated_at timestamp,
    foreign key (order_id) references orders(id) on delete cascade,
    foreign key (voucher_id) references vouchers(id) on delete cascade
);

create table if not exists logs (
    id uuid primary key,
    user_id uuid,
    reff_id uuid default null,
    reff_table varchar(50),
    url_path text,
    ip_address varchar(20),
    user_action text,
    created_at timestamp,
    foreign key (user_id) references users(id) on delete cascade
);