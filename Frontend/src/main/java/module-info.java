module aura {
    requires javafx.controls;
    requires javafx.fxml;

    opens aura to javafx.fxml;
    exports aura;
}
