package com.eshop.app.user.web.bodies;

import java.util.Date;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateAccountInformationRequest {

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  private String fullName;
  private String gender;
  private Date dateOfBirth;
  private String location;
  private String mobile;
  private String alternateMobile;
}
