package com.example.dyu.myfirstmapapp;

import android.location.Address;
import android.location.Geocoder;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        // Add a marker in Sydney and move the camera
        //LatLng sydney = new LatLng(-34, 151);
        List<String> locationList = new ArrayList<>();
        locationList.add("New York");
        locationList.add("Taipei");
        locationList.add("Paris");

        if(Geocoder.isPresent()){
            try {
                //String location = "New York";
                Geocoder gc = new Geocoder(this);

                for(String location: locationList){

                    List<Address> addresses= gc.getFromLocationName(location, 5); // get the found Address Objects

                    //List<LatLng> ll = new ArrayList<LatLng>(addresses.size()); // A list to save the coordinates if they are available
                    for(Address a : addresses){
                        if(a.hasLatitude() && a.hasLongitude()){
                            mMap.addMarker(new MarkerOptions()
                                    .position(new LatLng(a.getLatitude(), a.getLongitude())).title(location));
                            //locationMap.put(location, new LatLng(a.getLatitude(), a.getLongitude()));
                        }
                    }
                }

            } catch (IOException e) {
                // handle the exception
            }
        }

        //mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
    }
}
