# ========================================================
# Stage 1: Build the Spring Boot application using Maven
# ========================================================
FROM maven:3.9.9-eclipse-temurin-17-alpine AS builder

WORKDIR /app

# Cache Maven dependencies by copying pom.xml first
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy application source code
COPY src ./src

# Package the application JAR (skipping unit tests for fast Docker build)
RUN mvn clean package -DskipTests

# ========================================================
# Stage 2: Create lightweight production JRE runtime image
# ========================================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Create a non-root user for improved container security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy the generated JAR artifact from the builder stage
COPY --from=builder /app/target/ems-backend-*.jar app.jar

# Expose Spring Boot default port
EXPOSE 8080

# Environment defaults
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Launch Spring Boot with optimized JVM settings
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
