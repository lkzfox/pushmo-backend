CREATE TABLE pushmo.users (
    id SERIAL NOT NULL UNIQUE,
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(255)
);

CREATE TABLE pushmo.pacient (
    id SERIAL NOT NULL UNIQUE,
    user_id INT REFERENCES pushmo.users(id),
    name VARCHAR(50),
    born_at DATE,
    cpf VARCHAR(11),
    address VARCHAR(255)
);

CREATE TABLE pushmo.background (
    id SERIAL NOT NULL UNIQUE,
    user_id INT REFERENCES pushmo.users(id),
    pacient_id INT REFERENCES pushmo.pacient(id),
    current_medical_care BOOLEAN,
    current_medical_care_obs VARCHAR(255),
    allergic BOOLEAN,
    allergic_obs VARCHAR(255),
    pacemaker BOOLEAN,
    cardiac_change BOOLEAN,
    cardiac_change_obs VARCHAR(255),
    arterial_change BOOLEAN,
    arterial_change_obs VARCHAR(255),
    circulatory_disturbance BOOLEAN,
    circulatory_disturbance_obs VARCHAR(255),
    kidney_distrubance BOOLEAN,
    kidney_distrubance_obs VARCHAR(255),
    hormony_disturbance BOOLEAN,
    hormony_disturbance_obs VARCHAR(255),
    gastroINTestinal_disturbance BOOLEAN,
    gastroINTestinal_disturbance_obs VARCHAR(255),
    convulsion BOOLEAN,
    convulsion_obs VARCHAR(255),
    psychological_changes BOOLEAN,
    psychological_changes_obs VARCHAR(255),
    stress BOOLEAN,
    stress_obs VARCHAR(255),
    oncological_background BOOLEAN,
    oncological_background_obs VARCHAR(255),
    diabetes BOOLEAN,
    diabetes_obs VARCHAR(255),
    disease BOOLEAN,
    disease_obs VARCHAR(255)
);

CREATE TABLE pushmo.pressure_ulcer_location (
  id SERIAL NOT NULL UNIQUE,
  initials VARCHAR(5),
  description VARCHAR(255)
);

CREATE TABLE pushmo.pressure_ulcer_stage (
  id SERIAL NOT NULL UNIQUE,
  initials VARCHAR(5),
  description VARCHAR(255)
);

CREATE TABLE pushmo.pressure_ulcer (
  id SERIAL NOT NULL UNIQUE,
  user_id INT REFERENCES pushmo.users(id),
  pacient_id INT REFERENCES pushmo.pacient(id),
  image_path VARCHAR(255),
  pressure_ulcer_location_id INT REFERENCES pushmo.pressure_ulcer_location(id),
  pressure_ulcer_location_obs VARCHAR(255),
  pressure_ulcer_stage_id INT REFERENCES pushmo.pressure_ulcer_stage(id),
  created_at DATE
);

CREATE TABLE pushmo.area (
  id SERIAL NOT NULL UNIQUE,
  min DECIMAL(4,2),
  max DECIMAL(4,2),
  value INT 
);

CREATE TABLE pushmo.exudato (
  id SERIAL NOT NULL UNIQUE,
  description VARCHAR(255),
  value INT
);

CREATE TABLE pushmo.skin (
  id SERIAL NOT NULL UNIQUE,
  description VARCHAR(255),
  value INT
);

CREATE TABLE pushmo.push_entry (
  id SERIAL NOT NULL UNIQUE,
  user_id INT REFERENCES pushmo.users(id),
  length DECIMAL(4,2),
  width DECIMAL(4,2),
  exudato_id INT REFERENCES pushmo.exudato(id),
  skin_id INT REFERENCES pushmo.skin(id),
  area_id INT REFERENCES pushmo.area(id),
  pressure_ulcer_id INT REFERENCES pushmo.pressure_ulcer(id),
  created_at date,
  image_path VARCHAR(255)
);


CREATE TABLE pushmo.feature(
  id SERIAL NOT NULL UNIQUE,
  description VARCHAR(255)
);

CREATE TABLE pushmo.option (
  id SERIAL NOT NULL UNIQUE,
  description VARCHAR(255),
  feature_id INT REFERENCES pushmo.feature(id)
);

CREATE TABLE pushmo.option_push (
  id SERIAL NOT NULL UNIQUE,
  push_entry_id INT REFERENCES pushmo.push_entry(id),
  option_id INT REFERENCES pushmo.option(id),
  value boolean
);

CREATE TABLE pushmo.additional_info (
  id SERIAL NOT NULL UNIQUE,
  push_entry_id INT REFERENCES pushmo.push_entry(id),
  used_bandage VARCHAR,
  change_ratio VARCHAR,
  others VARCHAR
);