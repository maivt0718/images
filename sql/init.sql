-- Table: nguoi_dung (Users)
CREATE TABLE nguoi_dung (
    nguoi_dung_id INT PRIMARY KEY,
    email VARCHAR(255),
    mat_khau VARCHAR(255),
    ho_ten VARCHAR(255),
    tuoi INT,
    anh_dai_dien VARCHAR(255)
);

-- Table: binh_luan (Comments)
CREATE TABLE binh_luan (
    binh_luan_id INT PRIMARY KEY,
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_binh_luan DATE,
    noi_dung VARCHAR(255),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);

-- Table: hinh_anh (Images)
CREATE TABLE hinh_anh (
    hinh_id INT PRIMARY KEY,
    ten_hinh VARCHAR(255),
    duong_dan VARCHAR(255),
    mo_ta VARCHAR(255),
    nguoi_dung_id INT,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id)
);

-- Table: luu_anh (Saved Images)
CREATE TABLE luu_anh (
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_luu DATE,
    PRIMARY KEY (nguoi_dung_id, hinh_id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);


-- Sample data for nguoi_dung
INSERT INTO nguoi_dung (nguoi_dung_id, email, mat_khau, ho_ten, tuoi, anh_dai_dien) VALUES
(1, 'john@example.com', 'password123', 'John Doe', 28, 'john_avatar.jpg'),
(2, 'jane@example.com', 'password456', 'Jane Smith', 25, 'jane_avatar.jpg'),
(3, 'alice@example.com', 'password789', 'Alice Wonderland', 30, 'alice_avatar.jpg'),
(4, 'bob@example.com', 'password321', 'Bob Marley', 40, 'bob_avatar.jpg'),
(5, 'charles@example.com', 'password654', 'Charles Xavier', 35, 'charles_avatar.jpg'),
(6, 'eve@example.com', 'password987', 'Eve Adams', 22, 'eve_avatar.jpg'),
(7, 'frank@example.com', 'password111', 'Frank Ocean', 45, 'frank_avatar.jpg'),
(8, 'grace@example.com', 'password222', 'Grace Hopper', 50, 'grace_avatar.jpg'),
(9, 'harry@example.com', 'password333', 'Harry Potter', 21, 'harry_avatar.jpg'),
(10, 'irene@example.com', 'password444', 'Irene Adler', 32, 'irene_avatar.jpg'),
(11, 'james@example.com', 'password555', 'James Bond', 38, 'james_avatar.jpg'),
(12, 'karen@example.com', 'password666', 'Karen Gillan', 29, 'karen_avatar.jpg'),
(13, 'leo@example.com', 'password777', 'Leonardo DiCaprio', 48, 'leo_avatar.jpg'),
(14, 'maya@example.com', 'password888', 'Maya Angelou', 60, 'maya_avatar.jpg'),
(15, 'noah@example.com', 'password999', 'Noah Centineo', 24, 'noah_avatar.jpg'),
(16, 'oliver@example.com', 'password1234', 'Oliver Queen', 34, 'oliver_avatar.jpg'),
(17, 'paul@example.com', 'password2345', 'Paul Walker', 40, 'paul_avatar.jpg'),
(18, 'quentin@example.com', 'password3456', 'Quentin Tarantino', 57, 'quentin_avatar.jpg'),
(19, 'rachel@example.com', 'password4567', 'Rachel Green', 27, 'rachel_avatar.jpg'),
(20, 'sam@example.com', 'password5678', 'Sam Winchester', 35, 'sam_avatar.jpg');

INSERT INTO hinh_anh (hinh_id, ten_hinh, duong_dan, mo_ta, nguoi_dung_id) VALUES
(1, 'sunset_beach', 'images/sunset.jpg', 'A beautiful sunset at the beach', 1),
(2, 'mountain_peak', 'images/mountain.jpg', 'The highest mountain peak', 2),
(3, 'city_lights', 'images/city.jpg', 'City skyline at night', 3),
(4, 'forest_trail', 'images/forest.jpg', 'A peaceful trail in the forest', 4),
(5, 'river', 'images/river.jpg', 'Flowing river in the woods', 1),
(6, 'snowy_mountain', 'images/snowy_mountain.jpg', 'Snow-covered mountain view', 2),
(7, 'night_sky', 'images/night_sky.jpg', 'Starry night sky', 3),
(8, 'desert_dunes', 'images/desert.jpg', 'Waves of sand in the desert', 4),
(9, 'autumn_leaves', 'images/autumn.jpg', 'Golden leaves in autumn', 5),
(10, 'waterfall', 'images/waterfall.jpg', 'Majestic waterfall', 1),
(11, 'ocean_wave', 'images/ocean_wave.jpg', 'Giant ocean wave', 2),
(12, 'flower_field', 'images/flower_field.jpg', 'A field of colorful flowers', 3),
(13, 'rock_cliff', 'images/rock_cliff.jpg', 'Steep cliff by the sea', 1),
(14, 'city_sunset', 'images/city_sunset.jpg', 'Sunset over the city', 4),
(15, 'forest_lake', 'images/forest_lake.jpg', 'Lake surrounded by trees', 2),
(16, 'desert_cactus', 'images/cactus.jpg', 'Cactus in the desert', 5),
(17, 'tropical_beach', 'images/tropical_beach.jpg', 'Tropical island beach', 3),
(18, 'countryside', 'images/countryside.jpg', 'Countryside with rolling hills', 1),
(19, 'mountain_hike', 'images/mountain_hike.jpg', 'Hiking trail up the mountain', 2),
(20, 'city_night_lights', 'images/city_night.jpg', 'City lights at night', 4);



-- Sample data for binh_luan (Comments) with repeated user and image IDs
INSERT INTO binh_luan (binh_luan_id, nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung) VALUES
(1, 1, 1, '2024-10-20', 'Amazing sunset!'),
(2, 1, 2, '2024-10-21', 'The beach looks stunning.'),
(3, 2, 2, '2024-10-21', 'I love this beach view.'),
(4, 3, 1, '2024-10-22', 'Sunsets are always beautiful.'),
(5, 3, 3, '2024-10-23', 'Hiking this mountain was thrilling!'),
(6, 4, 4, '2024-10-23', 'The city skyline is awe-inspiring.'),
(7, 5, 4, '2024-10-24', 'This city is so lively at night.'),
(8, 5, 5, '2024-10-24', 'The forest feels serene.'),
(9, 6, 6, '2024-10-25', 'This river is calming.'),
(10, 6, 5, '2024-10-25', 'I would visit this forest again.'),
(11, 1, 6, '2024-10-26', 'The river runs deep.'),
(12, 2, 1, '2024-10-26', 'Watching the sunset here was amazing.'),
(13, 7, 7, '2024-10-27', 'The desert is beautiful but harsh.'),
(14, 8, 7, '2024-10-27', 'Deserts have their own charm.'),
(15, 9, 8, '2024-10-28', 'The snow on the mountains is stunning.'),
(16, 9, 9, '2024-10-28', 'The ocean looks inviting.'),
(17, 9, 1, '2024-10-29', 'I could watch sunsets every day.'),
(18, 10, 10, '2024-10-29', 'This lake at sunset is mesmerizing.'),
(19, 10, 9, '2024-10-30', 'I love being near the ocean.'),
(20, 11, 8, '2024-10-30', 'Snow-covered mountains are breathtaking.');

-- Sample data for luu_anh (Saved Images) with repeated user and image IDs
INSERT INTO luu_anh (nguoi_dung_id, hinh_id, ngay_luu) VALUES
(1, 1, '2024-10-21'),
(1, 2, '2024-10-21'),
(1, 3, '2024-10-22'),
(2, 2, '2024-10-22'),
(2, 1, '2024-10-23'),
(2, 4, '2024-10-23'),
(3, 1, '2024-10-24'),
(3, 3, '2024-10-24'),
(3, 5, '2024-10-25'),
(4, 4, '2024-10-25'),
(4, 5, '2024-10-26'),
(5, 6, '2024-10-26'),
(5, 7, '2024-10-27'),
(6, 6, '2024-10-27'),
(6, 1, '2024-10-28'),
(7, 7, '2024-10-28'),
(8, 8, '2024-10-29'),
(9, 9, '2024-10-29'),
(10, 10, '2024-10-30'),
(10, 9, '2024-10-30');
