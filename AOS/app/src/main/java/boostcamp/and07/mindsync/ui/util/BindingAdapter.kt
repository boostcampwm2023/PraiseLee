package boostcamp.and07.mindsync.ui.util

import android.net.Uri
import android.widget.ImageView
import android.widget.TextView
import androidx.databinding.BindingAdapter
import boostcamp.and07.mindsync.R
import coil.load
import coil.transform.CircleCropTransformation
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@BindingAdapter("app:imageUri")
fun ImageView.loadImage(uri: String) {
    load(Uri.parse(uri)) {
        placeholder(R.mipmap.ic_app_logo_round)
        error(R.mipmap.ic_app_logo_round)
        transformations(CircleCropTransformation())
    }
}

@BindingAdapter("app:date")
fun TextView.bindDate(date: LocalDate) {
    val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
    this.text = date.format(formatter)
}
