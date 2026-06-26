package com.lab56.services;

import com.lab56.dtos.AuthResponse;
import com.lab56.dtos.LoginRequest;
import com.lab56.dtos.RegisterRequest;
import com.lab56.entities.Role;
import com.lab56.entities.User;
import com.lab56.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse signup(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent())
            throw new RuntimeException("Email đã được sử dụng: " + request.email());

        var user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        return buildToken(user);
    }

    public AuthResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        var user = userRepository.findByEmail(request.email()).orElseThrow();
        return buildToken(user);
    }

    // Đưa role vào claims để front-end đọc được quyền (ẩn/hiện nút theo USER/ADMIN)
    private AuthResponse buildToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name());
        return new AuthResponse(jwtService.generateToken(claims, user));
    }
}
