package com.example.PicSkewApplication.Controller;

import com.example.PicSkewApplication.Model.Signup;
import com.example.PicSkewApplication.Service.SignupService;
import com.example.PicSkewApplication.SignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class SignupController {
    @Autowired
    private SignupService Signupserobj;

    @CrossOrigin
    @PostMapping("/Signup")
    public int adduser(@RequestBody Signup stuobj){
        int res=Signupserobj.addUser(stuobj);
        if (res==0){
            return 0;
        }
        return 1;
    }

    @CrossOrigin
    @PostMapping("/login")
    public List<Signup> finduser(@RequestBody Signup stuobj){
        List<Signup> obj=Signupserobj.findRecord(stuobj);
        return obj;
    }
    @CrossOrigin
    @GetMapping("/viewer/{param_id}")
    public List<Signup> finduser(@PathVariable int param_id){
        return Signupserobj.findbyid(param_id);

    }

}
