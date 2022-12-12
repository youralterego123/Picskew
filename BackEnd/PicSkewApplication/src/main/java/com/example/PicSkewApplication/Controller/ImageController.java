package com.example.PicSkewApplication.Controller;

import com.example.PicSkewApplication.Model.Image;
import com.example.PicSkewApplication.Model.Signup;
import com.example.PicSkewApplication.Service.ImageService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/image")
public class ImageController {
    @Autowired
    private ImageService imageDataService;

    private static String imageDirectory = System.getProperty("user.home") + "\\OneDrive - Entain Group\\workspace\\PicSkewProject\\FrontEnd\\picskew\\public\\images";

//    imageData.append('imagecaption',imagecaption);
//        imageData.append('uploaderid',uploaderid);
//        imageData.append('uploadername',uploadername);
    @CrossOrigin
    @PostMapping("/createpost")
    public int uploadImage(@RequestParam("imageFile") MultipartFile file,
                                         @RequestParam("imageName") String name,
                                         @RequestParam("imagecaption") String caption,
                                         @RequestParam("uploaderid") int uploaderid,
                                         @RequestParam("uploadername") String uploadername) throws IOException {
        makeDirectoryIfNotExist(imageDirectory);
        System.out.println(imageDirectory);
        //Path fileNamePath = Paths.get(imageDirectory, name.concat("."));
        Path fileNamePath = Paths.get(imageDirectory,
                name.concat(".").concat(FilenameUtils.getExtension(file.getOriginalFilename())));
        Files.write(fileNamePath, file.getBytes());
        name=name.concat(".").concat(FilenameUtils.getExtension(file.getOriginalFilename()));
        imageDataService.addrecord(name,caption,uploaderid,uploadername);
        return 1;
    }
    @CrossOrigin
    @GetMapping("/imagebyuser/{param_id}")
    public List<Image> findimagebyuser(@PathVariable int param_id){
        return imageDataService.findbyuser(param_id);

    }

    @CrossOrigin
    @GetMapping("/view/{param_id}")
    public Optional<Image> findImageById(@PathVariable int param_id){
        return imageDataService.findImageById(param_id);

    }

    @CrossOrigin
    @GetMapping("/viewall")
    public List<Image> findAllImage(){
        return imageDataService.findAll();

    }
    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void deleteCategory(@PathVariable int id){
        imageDataService.deleteCategory(id);
    }
    @CrossOrigin
    @PutMapping("/edit/{id}")
    public int updateCategory(@PathVariable int id,@RequestParam("imagecaption") String caption){
        System.out.println(caption);
         imageDataService.updateimage(caption,id);
         return 1;

    }

    private void makeDirectoryIfNotExist(String imageDirectory) {
        File directory = new File(imageDirectory);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }

}
