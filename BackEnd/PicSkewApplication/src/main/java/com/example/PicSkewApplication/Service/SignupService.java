package com.example.PicSkewApplication.Service;

import com.example.PicSkewApplication.Model.Signup;
import com.example.PicSkewApplication.SignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SignupService {
@Autowired
    private SignupRepository signuprepoObject;

public int addUser(Signup obj){
    String email= obj.getEmail();
    List<Signup> signobj=signuprepoObject.findByEmail(email);
    if(signobj.isEmpty()){
        signuprepoObject.save(obj);
        return 1;
    }
    else{
        return 0;
    }

}

public List<Signup> findRecord(Signup stuobj){
    List<Signup> login=signuprepoObject.findByEmail(stuobj.getEmail());
    if(login.isEmpty()){
        return null;
    }
    String passwordsent=stuobj.getPassword();
    String passworddatabase=login.get(0).getPassword();
    if(passwordsent.equals(passworddatabase)){
        if(login.get(0).getRole().equals("viewer")){
            return login;
        }
        else{
            return login;
        }

    }
    else {
        return null;
    }

}

    public List<Signup> findbyid(int param_id) {
    return signuprepoObject.findById(param_id);
    }
}
