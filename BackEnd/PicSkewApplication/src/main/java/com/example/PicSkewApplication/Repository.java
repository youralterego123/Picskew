package com.example.PicSkewApplication;

import com.example.PicSkewApplication.Model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface Repository extends JpaRepository<Image,Integer> {

    public List<Image> findByUploaderid(int param_id);
}
