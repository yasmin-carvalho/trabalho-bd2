# REDEMET API

### Neste relatório foi utilizada a API da REDEMET que fornece acesso a vários produtos meteorológicos. Foram implementadas rotas para retornar informações de Aeródromos e também mensagens SIGMET, METAR e TAF de países disponíveis no banco de dados.

## API link

- https://ajuda.decea.mil.br/base-de-conhecimento/api-redemet-o-que-e/

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [NextJS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

## Script do banco de dados

```sql
CREATE TABLE public.aerodromos (
	code character(4) COLLATE pg_catalog."default" NOT NULL,
  	latitude double precision NOT NULL,
	longitude double precision NOT NULL,
	name character varying(200) COLLATE pg_catalog."default" NOT NULL,
	CONSTRAINT aerodromos_pkey PRIMARY KEY (code),
	CONSTRAINT latitude_pos CHECK (latitude <= 90::double precision),
	CONSTRAINT longitude_pos CHECK (longitude <= 180::double precision),
	CONSTRAINT latitude_neg CHECK (latitude >= '-90'::integer::double precision),
	CONSTRAINT longitude_neg CHECK (longitude >= '-180'::integer::double precision)
);

CREATE INDEX aerodromos_coordinates
	ON public.aerodromos USING btree
	(latitude ASC NULLS LAST, longitude ASC NULLS LAST);


CREATE TABLE public.metar(
	id SERIAL,
	code_aerodromo character(4) COLLATE pg_catalog."default" NOT NULL,
	validade_inicial timestamp without time zone NOT NULL,
	recebimento timestamp without time zone NOT NULL,
  	message text COLLATE pg_catalog."default" NOT NULL,
  	CONSTRAINT taf_pkey PRIMARY KEY (id),
  	CONSTRAINT code_message_metar UNIQUE (code_aerodromo, validade_inicial, recebimento),
  	CONSTRAINT code_aerodromo_metar FOREIGN KEY (code_aerodromo)
		REFERENCES public.aerodromos (code) MATCH FULL
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE public.taf(
	id SERIAL,
	code_aerodromo character(4) COLLATE pg_catalog."default" NOT NULL,
	validade_inicial timestamp without time zone NOT NULL,
	recebimento timestamp without time zone NOT NULL,
  	message text COLLATE pg_catalog."default" NOT NULL,
	CONSTRAINT metar_pkey PRIMARY KEY (id),
  	CONSTRAINT code_message_taf UNIQUE (code_aerodromo, validade_inicial, recebimento),
  	CONSTRAINT code_aerodromo_taf FOREIGN KEY (code_aerodromo)
		REFERENCES public.aerodromos (code) MATCH FULL
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE public.sigmet(
	id SERIAL PRIMARY KEY,
	id_fir character(4) NOT NULL,
	lat_lon jsonb NOT NULL,
	validate_inicial timestamp without time zone NOT NULL,
	validate_final timestamp without time zone NOT NULL,
	message text COLLATE pg_catalog."default" NOT NULL,
	fenomeno text COLLATE pg_catalog."default" NOT NULL,
	fenomeno_comp text COLLATE pg_catalog."default" NOT NULL,
	fenomeno_cor text COLLATE pg_catalog."default" NOT NULL,
	fenomeno_transparencia text COLLATE pg_catalog."default" NOT NULL

);
```

# Relatório da API REDEMET - Etapas 1, 2 e 3

### Disciplina: Banco de Dados II

### Docente: Vanessa Cristina

### Equipe:

### Yasmin Karolyne Aniceto Carvalho - 2018010440

### Rodrigo Duarte Silva Luz - 2019003520

### Luiz Fernando de Souza - 2019008482

### Guilherme M. Bortoletto - 2019007734

### Guilherme de Assis Mello - 2018008521
