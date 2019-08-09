INSERT INTO pushmo.pressure_ulcer_location (initials,  description) VALUES ('S', 'Sacra');
INSERT INTO pushmo.pressure_ulcer_location (initials,  description) VALUES ('M', 'Maleolar');
INSERT INTO pushmo.pressure_ulcer_location (initials,  description) VALUES ('T', 'Troncatérica');
INSERT INTO pushmo.pressure_ulcer_location (initials,  description) VALUES ('C', 'Calcânea');

INSERT INTO pushmo.pressure_ulcer_stage (initials,  description) VALUES ('I', '...');
INSERT INTO pushmo.pressure_ulcer_stage (initials,  description) VALUES ('II', '...');
INSERT INTO pushmo.pressure_ulcer_stage (initials,  description) VALUES ('III', '...');
INSERT INTO pushmo.pressure_ulcer_stage (initials,  description) VALUES ('IV', '...');

INSERT INTO pushmo.area (min, max, value) VALUES (-1, 0, 0);
INSERT INTO pushmo.area (min, max, value) VALUES (0.01, 0.3, 1);
INSERT INTO pushmo.area (min, max, value) VALUES (0.31, 0.69, 2);
INSERT INTO pushmo.area (min, max, value) VALUES (0.7, 1.09, 3);
INSERT INTO pushmo.area (min, max, value) VALUES (1.1, 2.09, 4);
INSERT INTO pushmo.area (min, max, value) VALUES (2.1, 3.09, 5);
INSERT INTO pushmo.area (min, max, value) VALUES (3.1, 4.09, 6);
INSERT INTO pushmo.area (min, max, value) VALUES (4.1, 8.09, 7);
INSERT INTO pushmo.area (min, max, value) VALUES (8.1, 12.09, 8);
INSERT INTO pushmo.area (min, max, value) VALUES (12.1, 24, 9);
INSERT INTO pushmo.area (min, max, value) VALUES (24.01, 99.99, 10);

INSERT INTO pushmo.exudato (description, value) VALUES ('Ausente', 0);
INSERT INTO pushmo.exudato (description, value) VALUES ('Pequena', 1);
INSERT INTO pushmo.exudato (description, value) VALUES ('Moderada', 2);
INSERT INTO pushmo.exudato (description, value) VALUES ('Grande', 3);

INSERT INTO pushmo.skin (description, value) VALUES ('Ferida Fechada', 0);
INSERT INTO pushmo.skin (description, value) VALUES ('Tecido Eptelial', 1);
INSERT INTO pushmo.skin (description, value) VALUES ('Tecido de Granulação', 2);
INSERT INTO pushmo.skin (description, value) VALUES ('Esfacelo', 3);
INSERT INTO pushmo.skin (description, value) VALUES ('Tecido Necrótico', 4);