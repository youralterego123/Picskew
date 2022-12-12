package com.example.PicSkewApplication.Service;


import com.example.PicSkewApplication.Model.Image;
import com.example.PicSkewApplication.Model.Signup;
import com.example.PicSkewApplication.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    @Autowired
    private Repository imageDataRepository;

    public void uploadImage(Image obj){
  imageDataRepository.save(obj);

    }


    public List<Image> find() {
        return imageDataRepository.findAll();
    }

    public void addrecord(String name, String caption, int uploaderid, String uploadername) {
        Image obj =new Image();
        obj.setImagename(name);
        obj.setCaption(caption);
        obj.setUploaderid(uploaderid);
        obj.setUploadername(uploadername);

        imageDataRepository.save(obj);

    }

    public List<Image> findbyuser(int param_id) {
    return imageDataRepository.findByUploaderid(param_id);
    }

    public List<Image> findAll() {
        return imageDataRepository.findAll();
    }

    public Optional<Image> findImageById(int param_id) {
        return imageDataRepository.findById(param_id);
    }

    public void deleteCategory(int id){
        imageDataRepository.deleteById(id);
    }

    public void updateimage(String caption, int id) {
        Optional<Image> imgobj=imageDataRepository.findById(id);
        Image object=new Image();
        object.setId(imgobj.get().getId());
        object.setCaption(caption);
        object.setImagename(imgobj.get().getImagename());

        object.setUploaderid(imgobj.get().getUploaderid());
        object.setUploadername(imgobj.get().getUploadername());
        imageDataRepository.save(object);
    }
}
