package com.example.PicSkewApplication;

import com.example.PicSkewApplication.Model.Signup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

public interface SignupRepository extends JpaRepository<Signup,Long> {


    List<Signup> findByEmail(String email);
    List<Signup> findById(Integer id);
}
