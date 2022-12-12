package com.example.PicSkewApplication.Model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "image")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String imagename;

    private String caption;

    private int uploaderid;

    private String uploadername;



}
