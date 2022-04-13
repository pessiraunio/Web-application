CREATE TABLE IF NOT EXISTS public.users
(
    id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(60) COLLATE pg_catalog."default" NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.plans
(
    id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    title character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(300) COLLATE pg_catalog."default" NOT NULL,
    category character varying(50) COLLATE pg_catalog."default" NOT NULL,
    creator character varying(36) COLLATE pg_catalog."default" NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT plans_pkey PRIMARY KEY (id)
);