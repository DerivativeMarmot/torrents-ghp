fetch("./res/webapp.json")
    .then(response => {
        return response.json();
    })
    .then(res => {
        let content = document.createElement("div");
        content.setAttribute("id", "content");
        let title = document.createElement("div");
        title.setAttribute("id", "title");
        title.innerHTML = "Torrents Index";
        content.appendChild(title);

        let webapps = document.createElement("div");
        webapps.setAttribute("id", "webapp");
        for (let app in res) {
            let app_dict = res[app];
            let wa = document.createElement("div");
            wa.setAttribute("id", app);
            wa.setAttribute("class", "block");
            
            let logo = document.createElement("div");
            logo.setAttribute("id", "block-logo");
            let img = document.createElement("img");
            let app_logo = app_dict.logo;
            if (app_logo.path){
                img.setAttribute("src", app_logo.path);
                logo.appendChild(img);
            }else if (app_logo.html_base64){
                logo.innerHTML = atob(app_logo.html_base64) // decode base64
            }else{
                img.setAttribute("src", "./res/logo/default-logo.png");
                logo.appendChild(img);
            }
            wa.appendChild(logo);

            let name = document.createElement("div");
            name.setAttribute("id", "block-name");
            name.innerHTML = app_dict.display_name;
            wa.appendChild(name);

            if (app_dict.target) {
                let a = document.createElement("a");
                a.setAttribute("href", app_dict.target);
                a.appendChild(wa);
                webapps.appendChild(a);
            }
            else {
                webapps.appendChild(wa);
            }

        }
        content.appendChild(webapps);
        document.body.appendChild(content);
    });