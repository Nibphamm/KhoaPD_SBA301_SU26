package com.lab04.orchidmanagement.services;

import com.lab04.orchidmanagement.pojos.Orchid;

import java.util.List;
import java.util.Optional;

public interface IOrchidService {

    List<Orchid> getAllOrchids();

    Optional<Orchid> getOrchidById(Integer id);

    Orchid createOrchid(Orchid orchid);

    Orchid updateOrchid(Integer id, Orchid orchid);

    void deleteOrchid(Integer id);
}
