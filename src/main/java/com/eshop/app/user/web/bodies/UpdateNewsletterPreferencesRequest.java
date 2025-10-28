package com.eshop.app.user.web.bodies;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateNewsletterPreferencesRequest {
    private boolean subscribed;
}
